using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace Formulario.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public int UserCount { get; set; }
        public int PageReloadCount { get; set; }
        public int GlobalUserCount { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            // Incrementar el contador
            if (HttpContext.Items["GlobalUserCount"] == null)
            {
                HttpContext.Items["GlobalUserCount"] = 0;
            }

            int globalUserCount = (int)HttpContext.Items["GlobalUserCount"] + 1;
            HttpContext.Items["GlobalUserCount"] = globalUserCount;

            // Mostrar el contador 
            UserCount = globalUserCount;

            // Contador de recargas 
            if (HttpContext.Session.GetInt32("PageReloadCount") == null)
            {
                HttpContext.Session.SetInt32("PageReloadCount", 0);
            }
            int reloadCount = HttpContext.Session.GetInt32("PageReloadCount").Value + 1;
            HttpContext.Session.SetInt32("PageReloadCount", reloadCount);

            // Mostrar el contador
            PageReloadCount = reloadCount;
        }

    }
}