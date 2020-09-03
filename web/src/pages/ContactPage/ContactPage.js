import BlogLayout from 'src/layouts/BlogLayout'
import { useForm } from 'react-hook-form'

import {
  FieldError,
  Form,
  FormError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'
import {useMutation} from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {

  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted() {
      alert('Thank you for your submission!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }

  return (
    <BlogLayout>
      <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }} error={error} formMethods={formMethods}>
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <Label name="name" errorClassName="error">Name</Label>
        <TextField name="name" errorClassName="error" validation={{ required: true }} />
        <FieldError name="name" className="error" />
        <Label name="email" errorClassName="error">Email</Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
          }}
        />
        <FieldError name="email" className="error" />
        <Label name="message" errorClassName="error">Message</Label>
        <TextAreaField name="message" errorClassName="error" validation={{ required: true }} />
        <FieldError name="message" className="error" />
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
