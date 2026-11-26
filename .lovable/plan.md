# Dietary dish recommendations

Add a customer-facing feature to the shared weekly menu so visitors can describe their food preferences and receive AI recommendations drawn only from the published sample menu.

## User experience
- Add a preference field and a clear recommendation action to the menu.
- Show a loading state, matching menu suggestions, and a recoverable failure message without clearing the visitor's text.
- Include a note that recommendations are informational and that allergies or strict dietary needs must be confirmed with the business.

## Technical approach
- Enable Lovable Cloud for the secure server-side AI request.
- Use the installed Lovable AI Gateway SDK and its current eligible default text model, with generated types and the supported structured-output contract.
- Keep gateway credentials on the server. Validate input and accept only recommendations that exactly match weekly-menu entries.
- Add a focused test for menu-match validation and record the new server-function boundary in `AGENTS.md`.

## Verification
- Run focused tests and confirm the preview shows the menu form, handles a recommendation response, and preserves input on failure.
- Inspect build diagnostics and the route metadata before finishing.
