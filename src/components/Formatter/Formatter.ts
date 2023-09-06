import { ITypedMoney } from '../../types';

enum CurrenciesCodes {
  USD = 'USD',
}

enum CurrenciesMarks {
  USD = '$',
}

enum CurrenciesSmallInBig {
  USD = 100,
}

export default class Formatter {
  public static formatPrice(priceInfo: ITypedMoney): string {
    if (priceInfo.currencyCode === CurrenciesCodes.USD) {
      return this.formatUSD(priceInfo);
    }

    return '';
  }

  private static formatUSD(priceInfo: ITypedMoney): string {
    const priceInUSD = `${priceInfo.centAmount / CurrenciesSmallInBig.USD}`;
    let [dollarsStr, centsStr = ''] = priceInUSD.split('.');

    dollarsStr = `${CurrenciesMarks.USD}${dollarsStr}`;

    while (centsStr.length < priceInfo.fractionDigits) {
      centsStr = `0${centsStr}`;
    }

    return `${dollarsStr}.${centsStr}`;
  }
}
