using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Practices.Unity;
using Newtonsoft.Json.Serialization;
using ProductRecord.Interfaces;
using ProductRecord.Models;
using ProductRecord.Repository;
using ProductRecord.Resolver;

namespace ProductRecord
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.EnableSystemDiagnosticsTracing();

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Product, ProductDTO>();
                //.ForMember(dest => dest.LanacNaziv, opt => opt.MapFrom(src => src.Lanac.Naziv));


            });

            // Unity
            var container = new UnityContainer();
            container.RegisterType<IProductRepository, ProductRepository>(new HierarchicalLifetimeManager());
            //container.RegisterType<ILanacRepository, LanacRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
        }
    }
}
