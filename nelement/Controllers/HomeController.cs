using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nelement.Models;
using nelement.Services;

namespace nelement.Controllers
{
    public class HomeController : Controller
    {
        private readonly IApiService _service;

        public HomeController(IApiService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            var model = new ReservationForm
            {
                Restaurants = _service.GetRestaurants(),
                Tables = _service.GetTables(),
                AreBigTablesAvailable = true,
                ProviderCode = "NElements"
            };
            return View(model);
        }
    }
}
