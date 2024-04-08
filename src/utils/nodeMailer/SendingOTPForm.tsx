import {
  Heading,
  Html,
  Text,
  Tailwind,
  Container,
  CodeInline,
  Section,
  Hr,
} from "@react-email/components";

export const SendingOTPForm = (nonce: string) => {
  return (
    <Html lang="en">
      <Tailwind>
        <Container className="space-y-2">
          <Heading>Your One-Time Password (OTP)</Heading>
          <Hr />
          <CodeInline>{nonce}</CodeInline>
          <Hr />
          <Section>
            <Text>
              Please use this OTP within the next 5 minutes to proceed with your
              request. Do not share this OTP with anyone for security reasons.
            </Text>
            <Text>
              If you did not request this OTP or have any concerns, please
              contact our support team immediately.
            </Text>
            <Text>Thank you for using our services.</Text>
            <Heading>Your One-Time Password (OTP)</Heading>
            <Hr />
            <Heading as="h2">My-Dictionary</Heading>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
};
