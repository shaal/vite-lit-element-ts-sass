import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
  denormalize,
  MenuElementInterface,
  NormalizedMenuInterface,
} from 'decoupled-menu-parser/src';

/**
 * The Drupal Menu Component
 *
 * @element drupal-menu
 *
 */
@customElement('drupal-menu')
export class DrupalMenu extends LitElement {
  tree: MenuElementInterface[] = [];
  mobileStyle = 'none';
  isLoading = false;
  loadingMessage = 'Loading...';
  menuId = 'main';
  baseUrl = 'hello';

  connectedCallback() {
    super.connectedCallback();

    if (this.baseUrl && this.menuId) {
      this.fetchData();
    }
  }

  static menuLevelTemplate(levels: TemplateResult[]) {
    return html`<ul part="menu-level">
      ${levels}
    </ul>`;
  }

  menuLinkAndParentTemplate(
    title: string | undefined,
    href: string,
    children: MenuElementInterface['children']
  ) {
    return html`<li part="menu-item">
      <a href=${href}>${title}</a>
      <span part="menu-item">
        <button
          @click="${DrupalMenu.openMenu}"
          aria-expanded="false"
          aria-haspopup="true"
        >
          +
        </button>
        ${this.renderMenuLevel(children)}
      </span>
    </li>`;
  }

  menuParentTemplate(
    title: string | undefined,
    children: MenuElementInterface['children']
  ) {
    return html`<li part="menu-item">
      <button
        @click="${DrupalMenu.openMenu}"
        aria-expanded="false"
        aria-haspopup="true"
      >
        ${title}
      </button>
      ${this.renderMenuLevel(children)}
    </li>`;
  }

  static menuLinkTemplate(title: string | undefined, href: string) {
    return html`<li part="menu-item"><a href=${href}>${title}</a></li>`;
  }

  static menuItemTemplate(title: string | undefined) {
    return html`<li part="menu-item">${title}</li>`;
  }

  renderMenuLevel(level: MenuElementInterface['children']): TemplateResult {
    const levels = level.map(item => this.renderMenuItem(item));
    return DrupalMenu.menuLevelTemplate(levels);
  }

  renderMenuItem(item: MenuElementInterface) {
    const title = item.link.attributes.title;
    const href = item.link.href;
    const children = item.children;

    if (href && children && children.length) {
      return this.menuLinkAndParentTemplate(title, href, children);
    }
    if (children && children.length) {
      return this.menuParentTemplate(title, children);
    }
    if (href) {
      return DrupalMenu.menuLinkTemplate(title, href);
    }
    return DrupalMenu.menuItemTemplate(title);
  }

  fetchData() {
    this.isLoading = true;
    // const url = `${this.baseUrl}/system/menu/${this.menuId}/linkset`;

    const json = {
      linkset: [
        {
          anchor: '/system/menu/main/linkset',
          item: [
            {
              'href': '/en',
              'title': 'Home',
              'drupal-menu-hierarchy': ['.000'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '/en/articles',
              'title': 'Articles',
              'drupal-menu-hierarchy': ['.001'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '/en/recipes',
              'title': 'Recipes',
              'drupal-menu-hierarchy': ['.002'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '/en/recipes/deep-mediterranean-quiche',
              'title': 'Deep mediterranean quiche',
              'drupal-menu-hierarchy': ['.002.000'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '/en/recipes/vegan-chocolate-and-nut-brownies',
              'title': 'Vegan chocolate and nut brownies',
              'drupal-menu-hierarchy': ['.002.001'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '',
              'title': 'Button only',
              'drupal-menu-hierarchy': ['.003'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '/en/articles/give-it-a-go-and-grow-your-own-herbs',
              'title': 'Give it a go and grow your own herbs',
              'drupal-menu-hierarchy': ['.003.000'],
              'drupal-menu-machine-name': ['main'],
            },
            {
              'href': '',
              'title': 'Text with no link',
              'drupal-menu-hierarchy': ['.004'],
              'drupal-menu-machine-name': ['main'],
            },
          ],
        },
      ],
    } as unknown as NormalizedMenuInterface;

    const denormalized = denormalize(json, this.menuId);
    if (!Array.isArray(denormalized)) {
      this.tree = denormalized.tree;
    }
    this.isLoading = false;

    /*
        fetch(url, {})
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            this.isLoading = false;
            throw new Error(
              `Unable to fetch ${url}. ${response.status} ${response.statusText}`
            );
          })
          .then(json => {
            try {
              json = {"linkset":[{"anchor":"/system/menu/main/linkset","item":[{"href":"/en","title":"Home","drupal-menu-hierarchy":[".000"],"drupal-menu-machine-name":["main"]},{"href":"/en/articles","title":"Articles","drupal-menu-hierarchy":[".001"],"drupal-menu-machine-name":["main"]},{"href":"/en/recipes","title":"Recipes","drupal-menu-hierarchy":[".002"],"drupal-menu-machine-name":["main"]},{"href":"/en/recipes/deep-mediterranean-quiche","title":"Deep mediterranean quiche","drupal-menu-hierarchy":[".002.000"],"drupal-menu-machine-name":["main"]},{"href":"/en/recipes/vegan-chocolate-and-nut-brownies","title":"Vegan chocolate and nut brownies","drupal-menu-hierarchy":[".002.001"],"drupal-menu-machine-name":["main"]},{"href":"","title":"Button only","drupal-menu-hierarchy":[".003"],"drupal-menu-machine-name":["main"]},{"href":"/en/articles/give-it-a-go-and-grow-your-own-herbs","title":"Give it a go and grow your own herbs","drupal-menu-hierarchy":[".003.000"],"drupal-menu-machine-name":["main"]},{"href":"","title":"Text with no link","drupal-menu-hierarchy":[".004"],"drupal-menu-machine-name":["main"]}]}]};
              const denormalized = denormalize(json, menuID);
              this.tree = denormalized.tree;
            } catch (e) {
              throw new Error('Unable to denormalize menu.');
            }
            this.isLoading = false;
          });
          */
  }

  static openMenu(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLElement;

    const isExpanded = target.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      target.setAttribute('aria-expanded', 'false');
      target.nextElementSibling?.classList.remove('show');
    } else {
      target.setAttribute('aria-expanded', 'true');
      target.nextElementSibling?.classList.add('show');
    }
  }

  render() {
    return html`
      <div id="main-menu">
        ${this.isLoading
          ? html`<slot name="loading">${this.loadingMessage}</slot>`
          : this.renderMenuLevel(this.tree)}
      </div>
    `;
  }
}
