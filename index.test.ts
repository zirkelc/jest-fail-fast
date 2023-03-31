beforeAll(() => {
	
});

describe("describe 1", () => {
	beforeAll(() => {
	});

	test("test 1", () => expect(1).toBe(1))

  describe("describe 2 ", () => {
		beforeAll(() => {
			throw new Error("beforeAll");

		});

		test("test 2", () => expect(1).toBe(1))

    describe("describe 3", () => {
      beforeAll(() => {
			});

			test("test 3", () => expect(1).toBe(1))
    })
  })
})