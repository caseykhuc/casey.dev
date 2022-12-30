import { useForm, ValidationError } from "@formspree/react";
import { Box, Button, Field, Heading, Textarea } from "theme-ui";

export default function Form() {
  const [state, handleSubmit] = useForm("xjvlrpvj");

  if (state.succeeded) {
    return <Heading>Thanks for joining!</Heading>;
  }

  return (
    <>
      <Box
        as="form"
        bg="muted"
        onSubmit={handleSubmit}
        sx={{
          p: 5,
          borderRadius: 8,
          border: "2px solid",
          borderColor: "highlight",
        }}
      >
        <Field label="Email" name="email" defaultValue="" mb={3} required />
        <Field label="Name" name="name" defaultValue="" mb={3} />
        <Field
          as={Textarea}
          rows={5}
          sx={{
            resize: "none",
          }}
          label="Comment"
          name="comment"
          defaultValue=""
          mb={3}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          mb={3}
        />
        <Button type="submit" disabled={state.submitting}>
          Submit
        </Button>
      </Box>
    </>
  );
}
