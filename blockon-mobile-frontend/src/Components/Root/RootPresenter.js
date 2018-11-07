import React from "react";
import { Text } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";

const RootPresenter = () => (
  <Text>RootRootRootRootRootRootRootRootRootRootRootRootRoot</Text>
);

/*
const RootContainer = styled.div`
  background-color: #fafafa;
  min-heignt: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  max-width: 1000px;
  width: 100%;
  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

const RootPresenter = ({ isLoading }) => (
  <NativeRouter>
    <RootContainer>
      <Header />
      {!isLoading && (
        <Main>
          <Switch>
            <Route
              exact
              path={`/`}
              render={() => (
                <Home
                  blocks={blocks.slice(0, 5)}
                  transactions={transactions.slice(0, 5)}
                />
              )}
            />
            <Route
              exact
              path={`/blocks`}
              render={() => <Blocks blocks={blocks} />}
            />
            <Route
              exact
              path={`/transactions`}
              render={() => <Transactions transactions={transactions} />}
            />
          </Switch>
        </Main>
      )}
    </RootContainer>
  </NativeRouter>
);
*/

export default RootPresenter;
