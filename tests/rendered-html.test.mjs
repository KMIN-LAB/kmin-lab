import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Korean MIN LAB homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>MIN LAB — 진균 병원성과 지속가능한 생명공학<\/title>/i);
  assert.match(html, /진균을 이해하고/);
  assert.match(html, /병원성과 약제 내성 기작/);
  assert.match(html, /Kyunghun Min/);
  assert.match(html, /장성원/);
  assert.match(html, /김주빈/);
  assert.match(html, /석사과정 입학 예정/);
  assert.match(html, /lab-group\.jpg/);
  assert.match(html, /seongwon-jang-profile\.jpg/);
  assert.match(html, /jubin-kim-profile\.jpg/);
  assert.match(html, /Min Lab, 2026/);
  assert.match(html, /최근 10년 연구 논문/);
  assert.match(html, /새로운 질문을 함께/);
  assert.match(html, /풀어갈 학생을 찾습니다/);
  assert.match(html, /Open navigation/);
  assert.match(html, /id="research"/);
  assert.match(html, /id="publications"/);
  assert.match(html, /id="contact"/);
  assert.doesNotMatch(html, /Your site is taking shape/);
});

test("server-renders the English route and real lab content", async () => {
  const response = await render("/en");
  const html = await response.text();

  assert.match(html, /<title>MIN LAB — Fungal Virulence &amp; Sustainable Biotechnology<\/title>/i);
  assert.match(html, /Decoding fungal virulence/);
  assert.match(html, /Mechanisms of virulence and drug resistance/);
  assert.match(html, /Nanosensors for real-time/);
  assert.match(html, /monitoring in plants/);
  assert.match(html, /Exploring mushroom evolution with AI/);
  assert.match(html, /Seongwon Jang/);
  assert.match(html, /Jubin Kim/);
  assert.match(html, /Incoming M\.S\. student/);
  assert.match(html, /k\.min@pknu\.ac\.kr/);
  assert.doesNotMatch(html, /sample content/);
});

test("ships meaningful alternatives for all supplied visuals", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Kyunghun Min, principal investigator/);
  assert.match(html, /진균 멀티오믹스 연구 모식도/);
  assert.match(html, /마이크로니들 센서/);
  assert.match(html, /계통유전체, 버섯 이미지, 생태 데이터/);
  assert.match(html, /research-multiomics-v2\.webp/);
  assert.match(html, /research-nanosensor-v3\.webp/);
  assert.match(html, /research-mushroom-ai-v3\.webp/);
});
