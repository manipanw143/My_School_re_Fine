import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  Layout,
  ErrorComponent,
} from "@refinedev/antd";
// import dataProvider from "@refinedev/simple-rest";
import { DataProvider } from "@refinedev/strapi-v4";

import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { CreateParent, ParentCreate, ParentList } from "./pages/posts/parents";
import { SecurityList } from "./pages/posts/security/list";

const API_URL = "http://localhost:1337/api";

const App = () => {

  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        dataProvider={DataProvider(API_URL)}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
            edit: "/posts/edit/:id",
            show: "/posts/show/:id",
          },
          {
            name: "parents",
            list: "/parents",
            create: "/parents/create",
            edit: "/parents/edit/:id",
            show: "/parents/show/:id",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "security",
            list: "/security",
            // create: "/parents/create",
            // edit: "/parents/edit/:id",
            // show: "/parents/show/:id",
            meta: {
              canDelete: true,
            },
          },
        ]}
        notificationProvider={useNotificationProvider}
        options={{
          warnWhenUnsavedChanges: true,
          syncWithLocation: true,
        }}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="posts">
              <Route index element={<PostList />} />
              <Route path="create" element={<PostCreate />} />
              <Route path="edit/:id" element={<PostEdit />} />
              <Route path="show/:id" element={<PostShow />} />
            </Route>
            <Route path="/parents">
              <Route index element={<CreateParent />} />
              {/* <Route path="create" element={<ParentCreate />} /> */}
              {/* <Route path="edit/:id" element={<ParentEdit />} /> */}
              {/* <Route path="show/:id" element={<ParentShow />} /> */}
            </Route>
            <Route path="/security">
              <Route index element={<SecurityList/>} />
              {/* <Route path="create" element={<ParentCreate />} /> */}
              {/* <Route path="edit/:id" element={<ParentEdit />} /> */}
              {/* <Route path="show/:id" element={<ParentShow />} /> */}
            </Route>

            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
