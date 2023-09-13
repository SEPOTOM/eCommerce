import DiscountAPI from '../../api/DiscountAPI/DiscountAPI';
import Converter from '../Converter/Converter';
import { DiscountCodeInfo } from '../../types';

export default class Discount {
  public static async getCodes(): Promise<DiscountCodeInfo[] | Error> {
    const response = await DiscountAPI.getCodes();

    if (response instanceof Error) {
      return response;
    }

    const codesInfo = response.map((codeResponse) => Converter.discountCodeResponseToInfo(codeResponse));

    return codesInfo;
  }
}
