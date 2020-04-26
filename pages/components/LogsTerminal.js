import React, { useEffect } from "react";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import useInterval from "@use-it/interval";
import { getLastLog, getLog, startPingTest, clearDatabase } from "~/utils/api";
import { Card, StyledAction } from "baseui/card";
import { useStyletron } from "baseui";

export default () => {
  const [logs, setLogs] = React.useState([]);

  useEffect(() => {
    (async () => {
      setLogs(await getLog());
    })();
  }, []);

  // useInterval(async () => {
  //   const lastLog = await getLastLog();
  //   setLogs((logs) => [...logs, lastLog]);
  // }, 2000);

  const [css, theme] = useStyletron();
  const logsWrapper = css({
    maxHeight: "50vh",
    color: theme.colors.primary600,
    overflow: "scroll",
  });

  return (
    <Block width={["600px"]} backgroundColor="primary200">
      <Card>
        <Button
          onClick={async () => {
            clearDatabase();
            setLogs(await getLog());
          }}
          disabled={logs.length === 0}
        >
          Clear database
        </Button>
        <br /> <br />
        {logs.length == 0 && (
          <div>
            <span>No logs in database</span>
          </div>
        )}
        <div className={logsWrapper}>
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
        </div>
      </Card>
    </Block>
  );
};
