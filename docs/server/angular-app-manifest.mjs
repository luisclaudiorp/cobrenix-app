
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/clients/list",
    "route": "/clients"
  },
  {
    "renderMode": 2,
    "route": "/clients/list"
  },
  {
    "renderMode": 2,
    "route": "/clients/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/products/list",
    "route": "/products"
  },
  {
    "renderMode": 2,
    "route": "/products/list"
  },
  {
    "renderMode": 2,
    "route": "/products/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/sales/list",
    "route": "/sales"
  },
  {
    "renderMode": 2,
    "route": "/sales/list"
  },
  {
    "renderMode": 2,
    "route": "/sales/register"
  },
  {
    "renderMode": 2,
    "route": "/user"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4OUHGUKT.js"
    ],
    "route": "/user/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2670, hash: '5bfe889f321fe96c5c265b5653a0b224a9175fd1bdb680bf88293e79586e9d98', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2465, hash: 'c7622fa618b7d7d8264e7120e406f32e20b6bf7f2f2488f355b8b3fbd75b0d88', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'clients/list/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/clients_list_index_html.mjs').then(m => m.default)},
    'clients/register/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/clients_register_index_html.mjs').then(m => m.default)},
    'products/list/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/products_list_index_html.mjs').then(m => m.default)},
    'products/register/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/products_register_index_html.mjs').then(m => m.default)},
    'sales/list/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/sales_list_index_html.mjs').then(m => m.default)},
    'sales/register/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/sales_register_index_html.mjs').then(m => m.default)},
    'user/index.html': {size: 23448, hash: '0d4312d10d63c782912d80fb8b20a80c5fdcee15ad10eb52ab6370e2f583f4ed', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'user/profile/index.html': {size: 23501, hash: 'a99c831d03fa47308e35aaf87b2cb12bc95e160df395bf4d902abd70e1e52721', text: () => import('./assets-chunks/user_profile_index_html.mjs').then(m => m.default)},
    'styles-AFWRXZOA.css': {size: 939, hash: 'PPyLntx6i5o', text: () => import('./assets-chunks/styles-AFWRXZOA_css.mjs').then(m => m.default)}
  },
};
