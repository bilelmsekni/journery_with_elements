using System.Collections.Generic;
using nelement.Models;

namespace nelement.Services
{
    public class ApiService : IApiService
    {
        public List<Restaurant> GetRestaurants()
        {
            return new List<Restaurant>{
                new Restaurant{
                    Value = "1",
                    Label = "Chinese"
                },
                new Restaurant{
                    Value = "2",
                    Label = "French"
                },
                new Restaurant{
                    Value = "3",
                    Label = "Indian"
                },
                new Restaurant{
                    Value = "4",
                    Label = "Italian"
                },
                new Restaurant{
                    Value = "5",
                    Label = "Mexican"
                },
                new Restaurant{
                    Value = "OTHER",
                    Label = "Surprise me"
                }
            };
        }

        public List<Table> GetTables()
        {
            return new List<Table>{
                new Table {
                    Label = "For 1",
                    Value = "1"
                },
                new Table {
                    Label = "For 2",
                    Value = "2"
                },
                new Table {
                    Label = "For 3",
                    Value = "3"
                },
                new Table {
                    Label = "For 4",
                    Value = "4"
                },
                new Table {
                    Label = "For 5",
                    Value = "5"
                },
                new Table {
                    Label = "For 6 or more",
                    Value = "6+"
                }
            };
        }
    }
}