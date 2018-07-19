using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nelement.Models;
using nelement.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace nelement.Controllers
{
    public class HomeController : Controller
    {
        private readonly IApiService _service;
        private readonly JsonSerializerSettings _jsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };

        public HomeController(IApiService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            var model = new ReservationForm
            {
                Restaurants = JsonConvert.SerializeObject(_service.GetRestaurants(), _jsonSettings),
                Tables = JsonConvert.SerializeObject(_service.GetTables(), _jsonSettings),
                AreBigTablesAvailable = JsonConvert.SerializeObject(true),
                ProviderCode = "NElements"
            };
            return View(model);
        }
    }
}
