import { Connect, DisConnect } from './src/Test/ClientTest';

describe("Test Alternative Database...", () => {

  beforeAll(async () => {

    await Connect();
  });

  afterAll(async () => {

    await DisConnect();
  });

  test("Should be able test Alternative Database...", async () => {

    enum OddOrEven {

      ODD = 'odd',
      EVEN = 'even'
    }

    const number1: number = 18;
    const number2: number = 22;

    const sumNumbers = async (n1: number, n2: number): Promise<number> => {

      return n1 + n2;
    }

    const verifyIsOddOrEven = async (n: number): Promise<string> => {

      if (n % 2 === 0) return OddOrEven.EVEN;

      else {

        console
          .log("Finalizando a fase de Testes de Integração... Connect");
      }
    }

    const sum = await sumNumbers(number1, number2);
    const oddOrEven = await verifyIsOddOrEven(sum);

    expect(oddOrEven)
      .toBe("even");

  });

});


