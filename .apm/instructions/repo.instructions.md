---
description: Rules for this repository
---
# Codex Engineering **Agents Guide**  (v2)

> **Mission:** Equip every AI agent contributing to Codex repositories with the same elite craftsmanship expected from our human engineers.  The guidelines below are **non‑negotiable corporate‑tier rules**—follow them or the CI will make you.

---

## 1. Guiding Influences

| Author               | Core Idea We Adopt                      |
| -------------------- | --------------------------------------- |
| **Kent Beck**        | Test‑Driven Development, Small Releases |
| **Robert C. Martin** | Clean Code & SOLID                      |
| **Sam Newman**       | Micro‑services, Continuous Delivery     |
| **Eric Evans**       | Domain‑Driven Design                    |

These authors’ books are canonical references; if a conflict arises, their principles win.

---

## 2. Golden Rules (🚨 TL;DR)

1. **Start with a failing test.** TDD is mandatory—no exceptions.
2. **Test behaviour, not implementation.** Private state is off‑limits.
3. **Commit like a pro.** Use [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#specification).
4. **PRs describe change‑sets via Keep a Changelog format.**
5. **Document every architectural decision.** Store ADRs in `docs/adr/` using `template.md`.
6. **Ship docs with code.** Update `docs/techdocs` *and* wire new pages in `docs/techdocs/mkdocs.yml`.
7. **NEVER touch `CHANGELOG.md`.** The release bot owns it.

Commit hooks and CI blocks enforce these rules.  Green builds are your handshake with the main branch.

---

## 3. Branch & Commit Strategy

### 3.1 Branch Naming

| Purpose | Pattern                    | Example                          |
| ------- | -------------------------- | -------------------------------- |
| Feature | `feat/<ticket-id>-<slug>`  | `feat/PROJ‑142‑user‑search`      |
| Bugfix  | `fix/<ticket-id>-<slug>`   | `fix/PROJ‑181‑null‑pointer`      |
| Hotfix  | `hotfix/<yyyymmdd>-<slug>` | `hotfix/20250714-critical‑patch` |

### 3.2 Conventional Commit Synopsis

```
<type>[optional scope][!]: <description>

[optional body]
[optional footer(s)]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
Add `!` for breaking changes and include a `BREAKING CHANGE:` footer.

---

## 4. Pull Request Protocol

Every PR **must** include the following:

* **Context & Motivation** — written for humans, not CPUs.
* **Keep a Changelog Section** — `Added / Changed / Deprecated / Removed / Fixed / Security`.
* **Checklist** *(CI enforces but reviewers verify)*:

  * [ ] Green unit & integration tests
  * [ ] Coverage ≥ 90 % for diff
  * [ ] Lint, static analysis & security scan pass
  * [ ] Docs updated (`docs/techdocs` + ADR link)
  * [ ] Conventional commit history (squash‑merged)

Merge method: **Squash & Merge**—the conventional commit from the PR title becomes the final commit.

---

## 5. Testing Guidelines

| Principle            | Requirement                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| **Scope**            | Unit tests isolate single behaviours; integration tests verify contract boundaries. |
| **TDD Cycle**        | *Red → Green → Refactor*. No production code without a failing test.                |
| **Isolation**        | Use in‑memory fakes; avoid network, filesystem, or time dependencies.               |
| **Coverage**         | 90 % minimum branch coverage *per PR*; resist meaningless tests.                    |
| **Property Testing** | Use property‑based tests for pure logic modules where feasible.                     |

Test directories:

```
/tests
  /unit
  /integration
```

---

## 6. Architectural Decision Records (ADR)

* **Location:** `docs/adr/`
* **Template:** `docs/adr/template.md`
* **Filename:** `NNNN-descriptive-slug.md` (four‑digit incremental id)
* **Linking:** Reference the ADR in your PR description and any relevant markdown in `docs/techdocs`.

> Remember: *If it isn’t in an ADR, it didn’t happen.*

---

## 7. Documentation Guidelines

1. **Tech Docs Home:** `docs/techdocs` (served by [MkDocs](https://www.mkdocs.org/)).
2. **New Pages:** Place under a logical sub‑folder.  Update `docs/techdocs/mkdocs.yml` navigation.
3. **Diagrams:** Prefer [Mermaid](https://mermaid.js.org/) inside markdown.  Large system diagrams can be placed in `docs/techdocs/assets/`.
4. **API Docs:** Autogenerate with tooling (`sphinx`, `typedoc`, etc.) and publish to techdocs.

Docs build is part of CI; broken links fail the pipeline.

---

## 8. Continuous Integration / Quality Gates

1. **Static Analysis:** Lint, formatting, type checks.
2. **Security Scan:** `trivy`, `npm audit`, `bandit`, etc.
3. **Tests + Coverage:** Enforced thresholds.
4. **Build Artifacts:** Containers/images signed & pushed.
5. **Release Automation:** Semantic‑release parses conventional commits and regenerates `CHANGELOG.md`.

CI **must** complete (<15 min SLA) before merge.

---

## 9. Code Style & Tooling Cheatsheet

| Language   | Formatter            | Linter                   | Extras                 |
| ---------- | -------------------- | ------------------------ | ---------------------- |
| Python     | `black`              | `flake8`, `mypy`         | `pytest`, `hypothesis` |
| TypeScript | `prettier`           | `eslint`                 | `jest`, `ts‑jest`      |
| Go         | `gofmt`              | `golangci‑lint`          | `go test`              |
| Java       | `google-java-format` | `checkstyle`, `spotbugs` | `junit`, `assertj`     |

Always run `make pre‑commit` locally before pushing.

---

## 10. Security & Compliance

* **Secrets** never live in the repo—use vault‑backed CI vars.
* Dependencies pinned with lock‑files; renovate bot opens update PRs.
* Critical CVEs patched within **24 h**.
* Follow OWASP top‑10 cheat‑sheet for web services.

---

## 11. Dependency Management

* Prefer smallest viable dependency surface.
* New runtime dependencies **require** an ADR justification.
* Use semantic version ranges only where safe; pin if in doubt.

---

## 12. Release & Deployment

1. **Semantic Versioning** (`MAJOR.MINOR.PATCH`).
2. Releases cut by pipeline; tagging triggers docker/image publication.
3. `CHANGELOG.md` is autogenerated—**do not touch it manually**.

---

## 13. Glossary

| Term      | Meaning                                        |
| --------- | ---------------------------------------------- |
| **ADR**   | Architectural Decision Record                  |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **SLA**   | Service Level Agreement                        |
| **TDD**   | Test‑Driven Development                        |

---

## 14. Enforcement & Governance

* Branch protection rules enforce passing CI, linear history, and signed commits.
* CI admins own the enforcement scripts; violations block merges.
* Repeated non‑compliance triggers an automated escalation to the Engineering Governance Board.

---

*This document is self‑referential: changes to **AGENTS.md** **must** obey all of its own rules.*
