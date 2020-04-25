import React, { useEffect } from "react";
import { Card, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Slider } from "baseui/slider";
import { Block } from "baseui/block";
import useInterval from "@use-it/interval";
import { getLastLog, getLog, startPingTest, clearDatabase } from "../utils/api";

export default () => {
  const [value, setValue] = React.useState([2]);

  const [logs, setLogs] = React.useState([]);

  useEffect(() => {
    (async () => {
      setLogs(await getLog());
    })();
  }, []);

  useInterval(async () => {
    const lastLog = await getLastLog();
    setLogs((logs) => [...logs, lastLog]);
  }, 2000);

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
            <Button onClick={() => startPingTest()}>Start Ping Test</Button>
            <Button onClick={() => clearDatabase()}>Clear database</Button>
          </StyledAction>
        </Card>
      </Block>
      <br />
      <Block width={["600px"]} backgroundColor="primary200">
        <Card>
          {logs.length > 0 &&
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
