import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";


import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register, CompanyList, CompanyCreate } from "./pages"

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { resources } from "./config/resources";




function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
   
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "AMpI9V-G5yx9x-MXp8F0",
                  liveMode: "auto",
                }}
              >
                <Routes>

                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    element = {
                    
                      <Authenticated
                        key = "authenticated-layout"
                        fallback = {<CatchAllNavigate to="/login" />}
                      >

                        <Layout>
                          <Outlet />
                        </Layout>

                      </Authenticated>
                      
                    }>

                      <Route index element={<Home />} /> 
                      <Route path="/companies"  >
                        <Route index  element={<CompanyList />}/>
                        <Route path="new"  element={<CompanyCreate />}/>

                      </Route>

                    </Route>
                    
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
