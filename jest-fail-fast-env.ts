import type { EnvironmentContext, JestEnvironment, JestEnvironmentConfig } from '@jest/environment';
import type { Global, Circus } from '@jest/types';
import { TestEnvironment } from 'jest-environment-node';

/**
 * Custom Jest TestEnvironment to fail test case on first error.
 *
 * @see https://jestjs.io/docs/configuration#testenvironment-string
 * @see https://github.com/facebook/jest/issues/6527##
 * @see https://stackoverflow.com/questions/51250006/jest-stop-test-suite-after-first-fail
 */
export class FailFastEnvironment extends TestEnvironment {
  failedTest = false;
  failedDescribeBlocks: Record<string, boolean> = {};

  // constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
  //   super(config, context);
  // }

  async handleTestEvent(event: Circus.Event, state: Circus.State) {
    if (event.name === 'hook_failure') {
      const describeBlock = event.hook.parent.name;
      this.failedDescribeBlocks[describeBlock] = true;
    }

    // if (event.name === "test_fn_failure") {
    //   this.failedDescribeBlocks[event.test.parent.name] = true
    // }

    // TODO check all parent describe blocks
    if (event.name === 'test_start' && this.failedDescribeBlocks[event.test.parent.name]) {
      event.test.mode = 'skip';
    }


    // @ts-ignore
    if (super.handleTestEvent) await super.handleTestEvent(event, state);
  }
}

export default FailFastEnvironment;
