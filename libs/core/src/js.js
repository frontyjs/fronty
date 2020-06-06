export const js = ({ container, onMount = () => {}, id, app, fronty }) => {
	onMount({ container, fronty, app: { id, ...app } });
};
