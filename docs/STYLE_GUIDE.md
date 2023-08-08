# Style Guide

## External links

[HTML + CSS Guide from HTMLAcademy](https://codeguide.academy/html-css.html)

[JavaScript Guide from HTMLAcademy](https://codeguide.academy/javascript.html)

[Guide from RSSchool](https://github.com/rolling-scopes-school/tasks/tree/master/stage1/modules/clean-code)

## The order of declaring entities in a class

Order:
1. Private fields
2. Protected fields
3. Public fields
4. constructor
5. Public methods
6. Protected methods
7. Private methods 

```ts
class MyClass {
  private prop;

  protected prop;

  public prop;

  constructor() {}

  public method() {}

  protected method() {}

  private method() {}
}
```

You should also aim for grouping by value/application:
```ts
// Good
class MyGoodClass {
  public getValue() {}

  public setValue() {}

  public setHandlers() {}
}

// Bad
class MyBadClass {
  public setValue() {}

  public getValue() {}

  public setHandlers() {}
}
```
