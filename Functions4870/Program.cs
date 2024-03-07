using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Functions4870.Models.School;
using Microsoft.EntityFrameworkCore;


var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureAppConfiguration(x => x.AddEnvironmentVariables())
    .ConfigureHostConfiguration(x => x.AddEnvironmentVariables())
    .ConfigureServices(services =>
    {
        services.AddSingleton<HttpClient>();
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddDbContext<SchoolContext>(
            x =>
            {
                var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
                x.UseSqlServer(connectionString);
            }
        );
    })
    .Build();


host.Run();
