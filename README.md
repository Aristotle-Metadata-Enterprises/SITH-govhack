# SITH-govhack

## Why is it called SITH?
We're using data from the Jobs and Education Data Infrastructure (JEDI) National Skill Classification dataset to help people find new job opportunities.

We are also using the ABS Data to get salary data broken down by gender and ANZSCO code to produce compara
tive salary information.


## How does it work?
SITH pulls data from a number of government sources in order to give Australian citizens insights that can help them plan their careers, transition to better paying jobs, or even find a new career that requires similar skills to their previous employment.

These professions are then cross referenced with ABS salary information, so that users could find upwards moves for their careers - better paying jobs that leverage skills they already possess!

## How did we use Aristotle?
The ANZSCO and Australian Skills Classification were first loaded into an Aristotle Metadata Registry, which exposes a comprehensive API allowing us to search and query the classification.

This was connected to a autocomplete search component, allowing users to search for any profession in milliseconds.

Once a profession was selected, the classification item was fetched from the API, as well as using a classification similarity API to identify other professions with shared skills.

