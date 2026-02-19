"""
DRF permission classes for FleeMa RBAC (#28).

5-role hierarchy:
  Superadmin > TenantAdmin > Manager > Employee > Driver
"""

from rest_framework.permissions import BasePermission

from authentication.models import Role


class IsSaaSAdmin(BasePermission):
    """Only the platform superadmin (Superadmin role) is allowed."""

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == Role.SUPERADMIN
        )


class IsTenantAdmin(BasePermission):
    """TenantAdmin or Superadmin."""

    _allowed = {Role.TENANT_ADMIN, Role.SUPERADMIN}

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in self._allowed
        )


class IsManagerOrTenantAdmin(BasePermission):
    """Manager, TenantAdmin, or Superadmin."""

    _allowed = {Role.MANAGER, Role.TENANT_ADMIN, Role.SUPERADMIN}

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in self._allowed
        )


class IsTenantMember(BasePermission):
    """Any user that belongs to a tenant (all roles except Superadmin)."""

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.tenant_id is not None
        )


class CanApproveExpenses(BasePermission):
    """Managers and above can approve expenses."""

    _allowed = {Role.MANAGER, Role.TENANT_ADMIN, Role.SUPERADMIN}

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in self._allowed
        )


class CanManageUsers(BasePermission):
    """Only TenantAdmin and Superadmin can manage users."""

    _allowed = {Role.TENANT_ADMIN, Role.SUPERADMIN}

    def has_permission(self, request, view) -> bool:
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in self._allowed
        )
