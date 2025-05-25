# FizzBuzz

This project exercises Angular Reactive Forms, Angular Material, Jasmine/Karma unit tests, as well as Cypress end-to-end tests. 

## Application Logging Strategy

Several types of application logging could take place in a system like this. We assume that we're in azure but there are equivalents in AWS and GCP.

1. Client side logging

    This kind of logging is useful to track the actions that users take when navigating across the system. It can be useful to log when users get into undesirable states such as in a component that fails `OnInit`. We can implement this in Azure by using the [Javascript Sdk for Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript-sdk)

2. Client side session replay

   This strategy involves recording a user's session to get some insight into the exact sequence of actions that led to particular issue or bug. It can also be useful to UX to see how a user finds features. An example of this is [User Pilot](https://userpilot.com/product/session-recording/)

3. Server side logging

    This kind of logging is useful to track server side exceptions as well as irregular requests. Modern systems will leverage OpenTelemetry to track requests across systems. .NET provides [tooling](https://learn.microsoft.com/en-us/azure/azure-monitor/app/opentelemetry-enable?tabs=aspnetcore) to enable the application to send logs to Application Insights. In our [API](https://github.com/CSharpFiasco/fizz-buzz-api), we use Serilog to write to a file as an example of basic logging.

4. Exception monitoring

    When things go wrong, [different kinds of alerts](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview) should be setup to inform the appropriate teams about failing systems. This could be as simple as alerts when any exception happens, but could also involve AI-based tools

## Development server

To start a local development server, run:

```bash
npm run serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`

## Building

To build the project run:

```bash
npm run build
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
npm run cypress:run
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
