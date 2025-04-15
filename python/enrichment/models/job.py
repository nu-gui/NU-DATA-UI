"""
Job models for the NU-DATA-UI enrichment service.
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Any, Optional, List


@dataclass
class EnrichmentJob:
    """Enrichment job model."""
    
    job_id: str
    list_id: str
    status: str = 'queued'
    message: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return {
            'job_id': self.job_id,
            'list_id': self.list_id,
            'status': self.status,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'EnrichmentJob':
        """Create from dictionary."""
        return cls(
            job_id=data.get('job_id'),
            list_id=data.get('list_id'),
            status=data.get('status', 'queued'),
            message=data.get('message'),
            created_at=datetime.fromisoformat(data.get('created_at')) if data.get('created_at') else None,
            updated_at=datetime.fromisoformat(data.get('updated_at')) if data.get('updated_at') else None,
            completed_at=datetime.fromisoformat(data.get('completed_at')) if data.get('completed_at') else None,
        )


@dataclass
class ListEntry:
    """List entry model."""
    
    id: str
    list_id: str
    first_name: str
    last_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    title: Optional[str] = None
    target_first_name: Optional[str] = None
    target_last_name: Optional[str] = None
    enriched: bool = False
    rpc_score: Optional[float] = None
    last_enriched_at: Optional[datetime] = None
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return {
            'id': self.id,
            'list_id': self.list_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'company': self.company,
            'title': self.title,
            'target_first_name': self.target_first_name,
            'target_last_name': self.target_last_name,
            'enriched': self.enriched,
            'rpc_score': self.rpc_score,
            'last_enriched_at': self.last_enriched_at.isoformat() if self.last_enriched_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'ListEntry':
        """Create from dictionary."""
        return cls(
            id=data.get('id'),
            list_id=data.get('list_id'),
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            email=data.get('email'),
            phone=data.get('phone'),
            company=data.get('company'),
            title=data.get('title'),
            target_first_name=data.get('target_first_name'),
            target_last_name=data.get('target_last_name'),
            enriched=data.get('enriched', False),
            rpc_score=data.get('rpc_score'),
            last_enriched_at=datetime.fromisoformat(data.get('last_enriched_at')) if data.get('last_enriched_at') else None,
            created_at=datetime.fromisoformat(data.get('created_at')) if data.get('created_at') else None,
            updated_at=datetime.fromisoformat(data.get('updated_at')) if data.get('updated_at') else None,
        )


@dataclass
class RPCScore:
    """RPC score model."""
    
    id: Optional[str] = None
    entry_id: str = ''
    job_id: str = ''
    score: float = 0.0
    category: Optional[str] = None
    first_name_score: Optional[float] = None
    last_name_score: Optional[float] = None
    full_name_score: Optional[float] = None
    created_at: datetime = field(default_factory=datetime.now)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return {
            'id': self.id,
            'entry_id': self.entry_id,
            'job_id': self.job_id,
            'score': self.score,
            'category': self.category,
            'first_name_score': self.first_name_score,
            'last_name_score': self.last_name_score,
            'full_name_score': self.full_name_score,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'RPCScore':
        """Create from dictionary."""
        return cls(
            id=data.get('id'),
            entry_id=data.get('entry_id', ''),
            job_id=data.get('job_id', ''),
            score=data.get('score', 0.0),
            category=data.get('category'),
            first_name_score=data.get('first_name_score'),
            last_name_score=data.get('last_name_score'),
            full_name_score=data.get('full_name_score'),
            created_at=datetime.fromisoformat(data.get('created_at')) if data.get('created_at') else None,
        )
