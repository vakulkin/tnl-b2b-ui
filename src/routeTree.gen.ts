/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RulesIndexImport } from './routes/rules/index'
import { Route as RolesIndexImport } from './routes/roles/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as LogicBlocksIndexImport } from './routes/logic-blocks/index'
import { Route as GroupsIndexImport } from './routes/groups/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const RulesIndexRoute = RulesIndexImport.update({
  id: '/rules/',
  path: '/rules/',
  getParentRoute: () => rootRoute,
} as any)

const RolesIndexRoute = RolesIndexImport.update({
  id: '/roles/',
  path: '/roles/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const LogicBlocksIndexRoute = LogicBlocksIndexImport.update({
  id: '/logic-blocks/',
  path: '/logic-blocks/',
  getParentRoute: () => rootRoute,
} as any)

const GroupsIndexRoute = GroupsIndexImport.update({
  id: '/groups/',
  path: '/groups/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/groups/': {
      id: '/groups/'
      path: '/groups'
      fullPath: '/groups'
      preLoaderRoute: typeof GroupsIndexImport
      parentRoute: typeof rootRoute
    }
    '/logic-blocks/': {
      id: '/logic-blocks/'
      path: '/logic-blocks'
      fullPath: '/logic-blocks'
      preLoaderRoute: typeof LogicBlocksIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
    '/roles/': {
      id: '/roles/'
      path: '/roles'
      fullPath: '/roles'
      preLoaderRoute: typeof RolesIndexImport
      parentRoute: typeof rootRoute
    }
    '/rules/': {
      id: '/rules/'
      path: '/rules'
      fullPath: '/rules'
      preLoaderRoute: typeof RulesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/groups': typeof GroupsIndexRoute
  '/logic-blocks': typeof LogicBlocksIndexRoute
  '/products': typeof ProductsIndexRoute
  '/roles': typeof RolesIndexRoute
  '/rules': typeof RulesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/groups': typeof GroupsIndexRoute
  '/logic-blocks': typeof LogicBlocksIndexRoute
  '/products': typeof ProductsIndexRoute
  '/roles': typeof RolesIndexRoute
  '/rules': typeof RulesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/groups/': typeof GroupsIndexRoute
  '/logic-blocks/': typeof LogicBlocksIndexRoute
  '/products/': typeof ProductsIndexRoute
  '/roles/': typeof RolesIndexRoute
  '/rules/': typeof RulesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/groups'
    | '/logic-blocks'
    | '/products'
    | '/roles'
    | '/rules'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/groups' | '/logic-blocks' | '/products' | '/roles' | '/rules'
  id:
    | '__root__'
    | '/'
    | '/groups/'
    | '/logic-blocks/'
    | '/products/'
    | '/roles/'
    | '/rules/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  GroupsIndexRoute: typeof GroupsIndexRoute
  LogicBlocksIndexRoute: typeof LogicBlocksIndexRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
  RolesIndexRoute: typeof RolesIndexRoute
  RulesIndexRoute: typeof RulesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  GroupsIndexRoute: GroupsIndexRoute,
  LogicBlocksIndexRoute: LogicBlocksIndexRoute,
  ProductsIndexRoute: ProductsIndexRoute,
  RolesIndexRoute: RolesIndexRoute,
  RulesIndexRoute: RulesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/groups/",
        "/logic-blocks/",
        "/products/",
        "/roles/",
        "/rules/"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/groups/": {
      "filePath": "groups/index.jsx"
    },
    "/logic-blocks/": {
      "filePath": "logic-blocks/index.jsx"
    },
    "/products/": {
      "filePath": "products/index.jsx"
    },
    "/roles/": {
      "filePath": "roles/index.jsx"
    },
    "/rules/": {
      "filePath": "rules/index.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
