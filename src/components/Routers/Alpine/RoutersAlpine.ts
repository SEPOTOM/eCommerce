import routers from '../../../data/routers';

export default () => ({
  init() {
    this.handleLocation();
  },

  route(event: Event) {
    event.preventDefault();

    const link: HTMLAnchorElement | null = (event.target as HTMLLinkElement).closest('a');
    let href: string | undefined = link?.href;

    href = !href ? window.location.origin : href;

    console.log(href);
    window.history.pushState({}, '', href);
    this.handleLocation();
  },

  handleLocation() {
    const path: string = window.location.pathname;

    console.log(path);

    if (routers[path]) {
      routers[path]();
    } else {
      routers['404']();
    }
  },
});
