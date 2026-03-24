# Product Availability Settings: Improving How We Handle Client-Level Changes

**Date:** 18 Mar 2026
**Status:** Proposal

---

## What Is This About?

In the admin panel, we can configure which tribute products (Booklet, Bookmark, Slideshow, etc.) are **available** and **enabled by default** for each funeral home client. When an admin changes these settings, the system currently goes through every single case belonging to that client and updates each one individually.

This document explains why that approach causes problems and proposes a better way to handle it.

---

## The Current Problem

### 1. Slow and Unreliable for Large Clients

When an admin saves changes to a client's product settings, the system:

1. Saves the client record
2. Fetches **every case** belonging to that client
3. Updates each case one by one

A funeral home with 1,000+ cases means 1,000+ individual database updates. This can take so long that the request times out before finishing, leaving some cases updated and others not — an inconsistent state that is difficult to detect or fix.

### 2. Turning Products Back On Doesn't Work

The system only pushes changes **when disabling** a product. It does not do the reverse:

- Admin **turns off** Booklet for a client --> all cases lose Booklet
- Admin **turns Booklet back on** --> nothing happens to existing cases

Those cases have permanently lost their Booklet setting. The only way to fix this is to go into each case individually and re-enable it — completely impractical for hundreds of cases.

### 3. Individual Case Customisations Get Overwritten

Sometimes a specific case has products configured differently from the rest of the client (e.g., a particular family doesn't want Slideshow). The current bulk update doesn't distinguish between "this was turned off by the admin globally" and "this was turned off for this specific case" — it just overwrites everything.

---

## How It Works Today

Think of it as a top-down copy:

```
Global Defaults (all products on)
        |
        v
Client Settings (admin configures available/default products)
        |
        v  <-- On save: updates EVERY case (the problem)
Case Settings (what each tribute actually uses)
```

The dashboard and download pages only look at the case-level settings. They never check what the client has configured. This means the system relies entirely on the bulk update to keep cases in sync with the client — which is where things break down.

---

## Proposed Solution: Look Up Settings on the Fly

Instead of copying settings down to every case whenever the client is saved, we **check settings at the time they're needed** using a simple priority system:

```
1. Check the case first    --> Does this specific case have a setting? Use it.
2. Then check the client   --> No case setting? Use the client's setting.
3. Then check the global   --> No client setting either? Use the platform default.
```

This is similar to how many systems handle configuration — the most specific setting always wins.

### What This Means in Practice

**For admins:**

- Saving client product settings becomes instant (no waiting for hundreds of cases to update)
- Turning a product back on works immediately — all cases inherit the client setting
- Individual case customisations are never accidentally overwritten

**For families/users:**

- No change to their experience — the dashboard and download pages show the same products, resolved from the same rules

**For existing data:**

- No database migration needed — cases that already have explicit product settings will continue to use them (case-level settings take priority)

---

## Example Scenarios

### Scenario 1: Admin Disables Booklet for a Client

|                          | Today                                                 | Proposed                                                                  |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| What happens on save     | System updates 1,000 cases one by one                 | System saves the client record only                                       |
| Time to save             | Potentially minutes, may time out                     | Instant                                                                   |
| When a user opens a case | Reads the case's own setting (which was bulk-updated) | Reads case first, then falls back to client setting — sees Booklet is off |

### Scenario 2: Admin Re-Enables Booklet

|                          | Today                           | Proposed                                                                             |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------ |
| What happens on save     | Nothing — cases are not updated | System saves the client record only                                                  |
| Effect on existing cases | Booklet stays off permanently   | Cases without their own override inherit the client's "on" setting — Booklet is back |

### Scenario 3: A Specific Case Has Slideshow Turned Off

|                                    | Today                                                            | Proposed                                                                    |
| ---------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Admin enables Slideshow for client | Bulk update turns Slideshow on for ALL cases, including this one | This case keeps its own "off" setting; other cases inherit "on" from client |

---

## Applying the Same Approach to Themes and Background Images

The same priority-based lookup can work for other settings that are currently managed at the client level:

**Themes:**

1. Check if the case has its own theme settings
2. Fall back to the client's branded themes
3. Fall back to platform-wide default themes

**Background Images:**

1. Check if the case has its own background image settings
2. Fall back to the client's background images
3. Fall back to global background images

This gives flexibility to customise individual cases without affecting the rest of the client, and avoids the same bulk-update problems we have with product availability today.

---

## Rollout Plan

### Phase 1 — Product Availability

1. Update the dashboard and download pages to check both case and client settings (instead of case only)
2. Remove the bulk case update from the client save process
3. No data migration — existing case data continues to work as-is

### Phase 2 — Visual Indicators (Optional)

Show in the case edit form which products are "inherited from client" vs "set on this case specifically", so admins can see what's coming from where.

### Phase 3 — Themes and Background Images (Future)

Apply the same pattern to themes and background images when needed.

---

## Summary

|                          | Today                                  | Proposed                                        |
| ------------------------ | -------------------------------------- | ----------------------------------------------- |
| Saving client settings   | Slow — updates every case individually | Fast — saves client record only                 |
| Risk of timeout          | High for large clients (1,000+ cases)  | None                                            |
| Turning products back on | Doesn't work — cases stay disabled     | Works automatically — cases inherit from client |
| Case-level customisation | Can be accidentally overwritten        | Always preserved                                |
| Database changes needed  | N/A                                    | None                                            |
