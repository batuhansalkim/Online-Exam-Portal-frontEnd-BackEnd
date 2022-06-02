using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace WebApplication1.Auth
{
        public class AuthProvider : OAuthAuthorizationServerProvider
        {
            public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
            {
                context.Validated();
            }

            public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
            {

                //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" }); // Farklı domainlerden istek sorunu yaşamamak için

                //Burada kendi authentication yöntemimizi belirleyebiliriz.Veritabanı bağlantısı vs...

                var uyeServis = new UyeService();
                var uye = uyeServis.UyeOturumAc(context.UserName, context.Password);
                List<string> UyeYetkileri = new List<string>();

                if (uye != null)
                {
                    string yetki = "";
                    if (uye.AdminUye == 1)
                    {
                        yetki = "Admin";

                    }
                    else
                    {
                        yetki = "Uye";
                    }
                    UyeYetkileri.Add(yetki);
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                    identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                    identity.AddClaim(new Claim(ClaimTypes.Role, yetki));
                    identity.AddClaim(new Claim(ClaimTypes.PrimarySid, uye.UyeId.ToString()));

                    AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {"uyeId",uye.UyeId.ToString() },
                    {"uyeKadi", uye.KullaniciAdi},
                    {"uyeYetkileri",Newtonsoft.Json.JsonConvert.SerializeObject(UyeYetkileri)}
                });
                    AuthenticationTicket ticket = new AuthenticationTicket(identity, propert);

                    context.Validated(ticket);
                }
                else
                {
                    context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");
                }



            }
            public override Task TokenEndpoint(OAuthTokenEndpointContext context)
            {
                foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
                {
                    context.AdditionalResponseParameters.Add(property.Key, property.Value);
                }

                return Task.FromResult<object>(null);
            }
        }
}
