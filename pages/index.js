import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button } from "baseui/button";
import { Slider } from "baseui/slider";

import { Block } from "baseui/block";
import { H5 } from "baseui/typography";

export default () => {
  const [value, setValue] = React.useState([2]);

  return (
    <div>
      <Block width={["600px"]} backgroundColor="primary200">
        <Card>
          <H5>Ping Settings</H5>
          <span>ping interval in seconds</span>
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
            >
              Start Ping Test
            </Button>
          </StyledAction>
        </Card>
      </Block>
    </div>
  );
};
