import React from "react";
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Slider } from "baseui/slider";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { getLastLog, getLog, startPingTest, clearDatabase } from "~/utils/api";
import LogsTerminal from "./components/LogsTerminal";

export default () => {
  const [value, setValue] = React.useState([2]);

  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale600 });
  return (
    <div>
      <Block width={["600px"]} backgroundColor="primary200">
        <Card>
          <span>
            Ping interval: <strong>2s</strong>
          </span>
          <br />
          <span>
            Host: <strong>google.com</strong>
          </span>
          <br /> <br />
          <StyledAction>
            <Button onClick={() => startPingTest()}>Start Ping Test</Button>
            <span className={space} />
          </StyledAction>
        </Card>
      </Block>
      <br />
      <LogsTerminal />
    </div>
  );
};
