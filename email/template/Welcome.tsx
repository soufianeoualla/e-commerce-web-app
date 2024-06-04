import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  confirmationLink: string;
}
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
export const WelcomeTemplate = ({
  name,
  confirmationLink,
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Discover the latest fashion trends</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.svg`}
          width="170"
          height="50"
          alt="Ecommerce Store"
          style={logo}
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Welcome to Ecommerce Store, Discover the latest fashion trends at our
          online clothing store, offering a curated selection of stylish and
          affordable apparel for every occasion.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={confirmationLink}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Regards,
          <br />
          Ecommerce Store
        </Text>
        <Hr style={hr} />
        <Text style={footer}>store@soufian.me</Text>
      </Container>
    </Body>
  </Html>
);

WelcomeTemplate.PreviewProps = {
  name: "Alan",
} as WelcomeEmailProps;

export default WelcomeTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#0E1422",
  borderRadius: "8px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "180px",
  padding: "14px 7px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
