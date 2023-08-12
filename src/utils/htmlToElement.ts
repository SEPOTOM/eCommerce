export default function htmlToElement<T extends HTMLElement>(htmlString: string): T | null {
  const template = document.createElement('template');
  template.innerHTML = htmlString;

  if (template.content.firstChild) {
    return template.content.firstChild as T;
  }

  return null;
}
