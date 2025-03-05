import assert from 'node:assert';
import { test, describe } from 'node:test';
import { run } from "../src/index.js";

describe('Resume Query Tests', () => {
  test('education queries should mention university', async () => {
    const response = await run("What university did Brian go to?");
    const expected = 'university of maryland';
    const lowerResponse = response.toLowerCase();
    assert(lowerResponse.includes(expected), 'Response should mention University of Maryland');
  });

  test('programming skills queries should mention key technologies', async () => {
    const response = await run("What programming languages does Brian know?");
    const expectedLanguages = ['typescript', 'javascript', 'c#', '.net'];
    expectedLanguages.forEach(language => {
      const lowerLanguage = language.toLowerCase();
      assert(lowerLanguage.includes(language), `Response should mention ${language}`);
    });
  });

  test('work history queries should include agency name', async () => {
    const response = await run("Where did Brian work most recently?");
    const lowerResponse = response.toLowerCase();
    const expected = 'census bureau';
    assert(lowerResponse.includes(expected), 'Response should mention Census Bureau');
  });
});