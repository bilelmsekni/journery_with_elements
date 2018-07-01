using System.Collections.Generic;
using nelement.Models;

namespace nelement.Services
{
    public interface IApiService
    {
        List<Restaurant> GetRestaurants();

        List<Table> GetTables();
    }
}