using System.Collections.Generic;

namespace nelement.Models
{
    public class ReservationForm
    {
        public List<Table> Tables { get; internal set; }
        public List<Restaurant> Restaurants { get; internal set; }
        public string ProviderCode { get; internal set; }
        public bool AreBigTablesAvailable { get; internal set; }
    }
}