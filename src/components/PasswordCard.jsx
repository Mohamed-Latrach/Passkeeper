import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Avatar from './Avatar';
import DeletePasswordModal from './DeletePasswordModal';

function PasswordCard({ password }) {
  const { details: userDetails } = useSelector(state => state.user)
  return (
    <Card>
      <Card.Img variant='top' className='card-img' src={password.logoPath} />
      <Card.Body className='border-top'>
        <Card.Title className='text-truncate'>{password.website}</Card.Title>
        <Card.Text className='text-truncate'>{password.username}</Card.Text>
        <Badge pill bg='primary'>{password.value}</Badge>

        <div className='d-flex justify-content-center text-primary gap-2'>

          <Link to={`/passwords/${password._id}`}>
            <i className="bi bi-box-arrow-up-right text-primary h3"></i>
          </Link>

          {userDetails?._id === password.user._id && (
            <>
              <Link to={`/update-password/${password._id}`}>
                <i className="bi bi-pencil-square text-warning h3"></i>
              </Link>
              <DeletePasswordModal password={password} />
            </>
          )}
          
        </div>

        <Avatar user={password.user} />
      </Card.Body>
    </Card>
  )
}

export default PasswordCard