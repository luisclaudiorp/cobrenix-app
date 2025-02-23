
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'cobrenix-app',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/cobrenix-app/auth/login",
    "route": "/cobrenix-app"
  },
  {
    "renderMode": 2,
    "redirectTo": "/cobrenix-app/auth/login",
    "route": "/cobrenix-app/auth"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/auth/login"
  },
  {
    "renderMode": 2,
    "redirectTo": "/cobrenix-app/clients/list",
    "route": "/cobrenix-app/clients"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/clients/list"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/clients/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/cobrenix-app/products/list",
    "route": "/cobrenix-app/products"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/products/list"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/products/register"
  },
  {
    "renderMode": 2,
    "redirectTo": "/cobrenix-app/sales/list",
    "route": "/cobrenix-app/sales"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/sales/list"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/sales/register"
  },
  {
    "renderMode": 2,
    "route": "/cobrenix-app/user"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-4OUHGUKT.js"
    ],
    "route": "/cobrenix-app/user/profile"
  },
  {
    "renderMode": 2,
    "redirectTo": "/cobrenix-app/auth/login",
    "route": "/cobrenix-app/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2681, hash: '395aa53df3400d9ace0508bc03c03a46e3fbaba96dc602bad9086e051b73a528', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2476, hash: '6e06e7b9595f5c1beff076c5780346af1a82b2dc38c8815c1ac4a4acc06cb27b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'clients/list/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/clients_list_index_html.mjs').then(m => m.default)},
    'clients/register/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/clients_register_index_html.mjs').then(m => m.default)},
    'products/list/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/products_list_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'sales/list/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/sales_list_index_html.mjs').then(m => m.default)},
    'products/register/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/products_register_index_html.mjs').then(m => m.default)},
    'sales/register/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/sales_register_index_html.mjs').then(m => m.default)},
    'user/index.html': {size: 23459, hash: 'c1be6a4da1c0a7780d57de47e9f7add5a9c45ad521f174fe8465fa93f69f487c', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'user/profile/index.html': {size: 23512, hash: 'b196ffd68700b1fafa3ae9fca3659d2ab7b6e076115d6111e44decc3e3e708e4', text: () => import('./assets-chunks/user_profile_index_html.mjs').then(m => m.default)},
    'styles-AFWRXZOA.css': {size: 939, hash: 'PPyLntx6i5o', text: () => import('./assets-chunks/styles-AFWRXZOA_css.mjs').then(m => m.default)}
  },
};
