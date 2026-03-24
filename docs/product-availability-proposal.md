# Product Availability: Cascading Settings Proposal

**Date:** 18 Mar 2026

---

## The Problem

When an admin changes a client's product settings (e.g. turning off Booklet), the system updates **every case** for that client one by one. This causes three issues:

1. **Slow and unreliable** — A client with 1,000+ cases triggers 1,000+ database writes. The request can time out, leaving cases in an inconsistent state.

2. **Re-enabling doesn't work** — Turning a product off pushes the change to all cases, but turning it back on does nothing. Those cases stay disabled permanently.

3. **Overwrites case customisations** — If a specific case had a product turned off for a reason, the bulk update ignores that and overwrites it.

---

## The Fix

Instead of copying settings to every case on save, **look them up when needed** using a simple priority:

> **Case setting > Client setting > Global default**
>
> The most specific setting always wins.

This means:

- Saving client settings becomes **instant** — no bulk updates
- Re-enabling a product **works immediately** — cases inherit from the client
- Case-level customisations are **never overwritten**
- No database migration needed

---

## Before vs After

|                            | Before                                 | After                                |
| -------------------------- | -------------------------------------- | ------------------------------------ |
| Admin saves client         | Updates every case (slow, can timeout) | Saves client only (instant)          |
| Admin re-enables a product | Cases stay disabled                    | Cases inherit the re-enabled setting |
| Case with custom settings  | Overwritten by bulk update             | Preserved — case settings always win |

---

## Future: Themes & Background Images

The same approach applies — check case level first, then client, then global. This avoids bulk updates and preserves per-case customisation for themes and background images too.
