# AWS SES Mock API

This is a mock implementation of the AWS Simple Email Service (SES) API for testing purposes. It simulates the behavior of AWS SES without actually sending emails.

## Features

- Full AWS SES API compatibility
- Email warming up simulation
- Quota management
- Statistics tracking
- Error handling matching AWS SES

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Send Email
`POST /v2/email/send`

Request body should match AWS SES SendEmail API format:

```json
{
  "Source": "sender@example.com",
  "Destination": {
    "ToAddresses": ["recipient@example.com"]
  },
  "Message": {
    "Subject": {
      "Data": "Test email"
    },
    "Body": {
      "Text": {
        "Data": "This is a test email"
      }
    }
  }
}
```

## Account Warming Up Rules

The mock API simulates AWS SES account warming up restrictions:

- First week: 200 emails per 24 hours
- Second week: 1,000 emails per 24 hours
- Third week: 5,000 emails per 24 hours
- After warming up: 50,000 emails per 24 hours

## Error Codes

- `ThrottlingException`: Daily quota exceeded or account in warming up period
- `ValidationError`: Invalid input parameters
- `InternalFailure`: Internal server error

## Statistics

The API tracks:
- Total emails sent
- Emails sent in last 24 hours
- Unique senders
- Unique recipients