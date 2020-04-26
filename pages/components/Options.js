import React, { useEffect } from "react";
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { useStyletron } from "baseui";
import { startPingTest, checkStatus } from "~/utils/api";

export default () => {
  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale600 });

  const [pingStatus, setPingStatus] = React.useState(false);

  useEffect(() => {
    (async () => {
      setPingStatus(await checkStatus());
    })();
  }, []);

  const buttonText = () => (pingStatus ? "Stop" : "Start");

  return (
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
          <Button
            onClick={() => {
              startPingTest();
              setPingStatus(!pingStatus);
            }}
          >
            {buttonText()} Ping Test
          </Button>
          <span className={space} />
        </StyledAction>
      </Card>
    </Block>
  );
};
