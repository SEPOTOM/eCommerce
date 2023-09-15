import { IAllCategories } from '../../api/Navigation/types/types';
import { Link } from '../../types';

export default class Links {
  private static categoriesLinks: Link[] = [];

  public static setCategoriesLinks(categoriesResponse: IAllCategories): void {
    categoriesResponse.results.forEach((categoryResponse) => {
      this.categoriesLinks.push({
        content: categoryResponse.name['en-US'],
        href: categoryResponse.key,
      });
    });
  }

  public static getCategoriesLinks(): Link[] {
    return this.categoriesLinks;
  }
}
