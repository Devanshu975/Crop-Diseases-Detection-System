# Data access

Presentational components should import from `@/lib/mock-data` (or a thin wrapper around it), not from fetch calls.

When backend services are ready, replace the mock modules with the same TypeScript shapes from `lib/types`:

1. Farmer profile → farmer service
2. Farms → farm service
3. Weather + 7-day forecast → weather service
4. Disease risk prediction → environmental risk service (likelihood of disease from conditions)
5. Disease detection result → image analysis / ML service (what is in the photo)
6. History → scan history service
7. Advisory → recommendation service

Keep disease detection and disease-risk prediction as separate responses. Do not fold weather risk into the image analysis result.
