app.constant("API",
  # @if ENV == 'DEVELOPMENT'
  base: 'http://localhost:3000/api/v1'
  system_base: 'http://localhost:3000'
  # @endif
  # @if ENV == 'TEST'
  base: 'stg-partners.loanstreet.com.my/'
  # @endif
  # @if ENV == 'PRODUCTION'
  base: 'https://api-example.com/'
  # @endif
)
