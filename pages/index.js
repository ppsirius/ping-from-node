import React, { useInterval, useEffect } from "react";
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Slider } from "baseui/slider";
import { Block } from "baseui/block";

export default () => {
  const [value, setValue] = React.useState([2]);

  const startPingTest = () => {
    fetch("/api/ping");
  };

  const [logs, setLogs] = React.useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      setLogs(await getLog());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getLog = async () => {
    const res = await fetch("/api/logs");
    return await res.json();
  };

  return (
    <div>
      <Block width={["600px"]} backgroundColor="primary200">
        <Card>
          <span>Ping interval in seconds</span>
          <Slider
            value={value}
            onChange={({ value }) => value && setValue(value)}
            onFinalChange={({ value }) => console.log(value)}
          />

          <StyledAction>
            <Button
              overrides={{
                BaseButton: { style: { width: "100%" } },
              }}
              onClick={() => startPingTest()}
            >
              Start Ping Test
            </Button>
          </StyledAction>
        </Card>
      </Block>
      <br />
      <Block width={["600px"]} backgroundColor="primary200">
        <Card>
          {logs &&
            logs
              .slice(0)
              .reverse()
              .map((log) => {
                return (
                  <div key={log.timestamp}>
                    <i>
                      <span>{log.timestamp} </span>
                    </i>
                    <strong>
                      <span>{log.ping} ms </span>
                    </strong>
                    <span> {log.host}</span>
                  </div>
                );
              })}
        </Card>
      </Block>
    </div>
  );
};
