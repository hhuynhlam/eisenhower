require 'net/http'
require 'uri'

class JsonWebToken
  class << self
    def verify(token)
      options = {
        algorithm: 'RS256',
        aud: Settings.auth0.client_id,
        iss: Settings.auth0.issuer,
        verify_iss: true,
        verify_aud: true
      }

      JWT.decode(token, nil, true, options) do |header|
        jwks_hash[header['kid']]
      end
    end

    private

    def jwks_hash
      jwks_raw = Net::HTTP.get URI("#{Settings.auth0.issuer}.well-known/jwks.json")
      jwks_keys = Array(JSON.parse(jwks_raw)['keys'])

      Hash[
        jwks_keys.map do |k|
          [k['kid'], OpenSSL::X509::Certificate.new(Base64.decode64(k['x5c'].first)).public_key]
        end
      ]
    end
  end
end
