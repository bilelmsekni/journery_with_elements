using System.Collections.Generic;

namespace nelement.Models
{
    public class ReservationForm
    {
        public string Tables { get; internal set; }
        public string Restaurants { get; internal set; }
        public string ProviderCode { get; internal set; }
        public string AreBigTablesAvailable { get; internal set; }
    }
}