app.constant("API",
  # @if ENV == 'DEVELOPMENT'
  base: 'http://localhost:3000/api/v1'
  base_image_url: 'http://localhost:3000'
  system_base: 'http://localhost:3000'
  spree_base: 'http://localhost:3000/api'
  # @endif
  # @if ENV == 'TEST'
  base: 'http://peb-webfac.tk/api/v1'
  base_image_url: 'http://peb-webfac.tk'
  system_base: 'http://peb-webfac.tk'
  spree_base: 'http://peb-webfac.tk/api'
  # @endif
  # @if ENV == 'MOBILE_DEV'
  base: 'http://192.168.57.1:3000/api/v1'
  base_image_url: 'http://192.168.57.1:3000'
  system_base: 'http://192.168.57.1:3000'
  spree_base: 'http://192.168.57.1:3000/api'
  # @endif
  # @if ENV == 'REAL_MOBILE_DEV'
  base: 'http://192.168.0.152:3000/api/v1'
  base_image_url: 'http://192.168.0.152:3000'
  system_base: 'http://192.168.0.152:3000'
  spree_base: 'http://192.168.0.152:3000/api'
  # @endif
  # @if ENV == 'PRODUCTION'
  base: 'http://peb-webfac.tk/api/v1'
  base_image_url: 'http://peb-webfac.tk'
  system_base: 'http://peb-webfac.tk'
  spree_base: 'http://peb-webfac.tk/api'
  # @endif
)
